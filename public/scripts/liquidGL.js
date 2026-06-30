(function () {
  "use strict";

  // Check WebGL availability
  if (typeof window.__liquidGLNoWebGL__ === "undefined") {
    const testCanvas = document.createElement("canvas");
    const testCtx =
      testCanvas.getContext("webgl2") ||
      testCanvas.getContext("webgl") ||
      testCanvas.getContext("experimental-webgl");
    window.__liquidGLNoWebGL__ = !testCtx;
  }

  class LiquidGlassRenderer {
    constructor(canvas, options) {
      this.canvas = canvas;
      this.options = Object.assign(
        {
          refraction: 0.045,
          bevelWidth: 0.12,
          specular: true,
          frost: 1.4,
          on: {},
        },
        options
      );

      this.gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!this.gl) return;

      this.scrollOffset = 0;
      this.mouseX = 0.5;
      this.mouseY = 0.5;
      this.hover = 0.0;
      this.width = 0;
      this.height = 0;

      this._initGL();
      this._resize();

      if (this.options.on.init) {
        this.options.on.init(this);
      }
    }

    _initGL() {
      const gl = this.gl;

      const vsSource = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          vUv.y = 1.0 - vUv.y;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform vec2  u_resolution;
        uniform float u_time;
        uniform vec2  u_mouse;
        uniform float u_scrollOffset;
        uniform float u_hover;
        uniform float u_refraction;
        uniform float u_bevelWidth;
        uniform float u_frost;
        uniform float u_specular;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        void main() {
          vec2 uv = vUv;
          float aspect = u_resolution.x / u_resolution.y;
          vec2 dEdge = min(uv, 1.0 - uv);
          float borderDist = min(dEdge.x * aspect, dEdge.y);
          float bevelWidth = u_bevelWidth * 0.08;
          float bevel = smoothstep(0.0, bevelWidth, borderDist);

          vec2 noiseCoord = uv * vec2(10.0, 3.0) + vec2(0.0, u_scrollOffset * 0.003);
          float n1 = noise(noiseCoord + u_time * 0.15);
          float n2 = noise(noiseCoord * 1.5 - u_time * 0.1);
          vec3 normal = vec3(0.0, 0.0, 1.0);
          float waveAmplitude = u_refraction * 0.06;
          normal.xy += vec2(n1 - n2) * waveAmplitude * bevel;
          normal = normalize(normal);

          float fresnel = pow(1.0 - max(0.0, dot(normal, vec3(0.0, 0.0, 1.0))), 3.0);
          vec3 edgeGlow = vec3(0.0, 245.0/255.0, 196.0/255.0) * fresnel * 0.22;

          vec2 toLight = u_mouse - uv;
          float lightDist = length(toLight * vec2(aspect, 1.0));
          float specularHighlight = pow(smoothstep(0.4, 0.0, lightDist), 12.0) * u_specular * 0.35;

          vec3 specColor = mix(
            vec3(0.0, 245.0/255.0, 196.0/255.0),
            vec3(10.0/255.0, 170.0/255.0, 255.0/255.0),
            sin(u_time * 0.4 + uv.x) * 0.5 + 0.5
          );

          float grain = hash(uv * 600.0 + fract(u_time * 0.3)) * 0.018 * u_frost;
          float borderHighlight = (1.0 - smoothstep(0.0, 0.006, borderDist)) * 0.22 * bevel;

          vec4 finalGlow = vec4(0.0);
          finalGlow.rgb += specColor * (specularHighlight + borderHighlight);
          finalGlow.rgb += edgeGlow;
          finalGlow.rgb += vec3(grain);
          finalGlow.a = (specularHighlight * 0.9 + fresnel * 0.14 + grain * 0.4 + borderHighlight * 0.4) * (0.16 + u_hover * 0.14);

          gl_FragColor = finalGlow;
        }
      `;

      // Compile Shaders
      const vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs, vsSource);
      gl.compileShader(vs);

      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fs, fsSource);
      gl.compileShader(fs);

      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      // Buffer
      const vertices = new Float32Array([
        -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
      ]);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const posAttr = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

      // Uniform cache
      this.program = program;
      this.u = {
        resolution: gl.getUniformLocation(program, "u_resolution"),
        time: gl.getUniformLocation(program, "u_time"),
        mouse: gl.getUniformLocation(program, "u_mouse"),
        scrollOffset: gl.getUniformLocation(program, "u_scrollOffset"),
        hover: gl.getUniformLocation(program, "u_hover"),
        refraction: gl.getUniformLocation(program, "u_refraction"),
        bevelWidth: gl.getUniformLocation(program, "u_bevelWidth"),
        frost: gl.getUniformLocation(program, "u_frost"),
        specular: gl.getUniformLocation(program, "u_specular"),
      };

      // Set static uniforms once
      gl.uniform1f(this.u.refraction, this.options.refraction);
      gl.uniform1f(this.u.bevelWidth, this.options.bevelWidth || 0.12);
      gl.uniform1f(this.u.frost, this.options.frost);
      gl.uniform1f(this.u.specular, this.options.specular ? 1.0 : 0.0);

      // Enable WebGL alpha blending
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    _resize() {
      const parent = this.canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = 1.0; // Performant sub-pixel layout
      this.width = rect.width;
      this.height = rect.height;

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = this.width + "px";
      this.canvas.style.height = this.height + "px";

      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.gl.uniform2f(
        this.u.resolution,
        this.canvas.width,
        this.canvas.height
      );
    }

    setScrollOffset(offset) {
      this.scrollOffset = offset;
    }

    setMousePosition(x, y) {
      this.mouseX = x;
      this.mouseY = y;
    }

    setHover(hoverVal) {
      this.hover = hoverVal;
    }

    render(time) {
      const gl = this.gl;
      if (!gl) return;

      // Clear the canvas to fully transparent before drawing
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(this.u.time, time * 0.001);
      gl.uniform1f(this.u.scrollOffset, this.scrollOffset);
      gl.uniform2f(this.u.mouse, this.mouseX, this.mouseY);
      gl.uniform1f(this.u.hover, this.hover);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }

  window.liquidGL = function (options) {
    if (window.__liquidGLNoWebGL__) return;

    const targetEl = document.querySelector(options.target);
    if (!targetEl) return;

    const hostEl = targetEl.querySelector(".nav-glass-liquid") || targetEl;

    let canvas = hostEl.querySelector(".liquid-glass-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "liquid-glass-canvas";
      canvas.style.cssText =
        "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;border-radius:inherit;";
      hostEl.appendChild(canvas);
    }

    const renderer = new LiquidGlassRenderer(canvas, options);
    window.__liquidGLRenderer__ = renderer;

    const handleResize = () => {
      if (renderer) renderer._resize();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const handleMouseMove = (e) => {
      if (!renderer) return;
      const rect = targetEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      renderer.setMousePosition(x, y);
      renderer.setHover(1.0);
    };

    const handleMouseLeave = () => {
      if (renderer) {
        renderer.setHover(0.0);
      }
    };

    targetEl.addEventListener("mousemove", handleMouseMove, { passive: true });
    targetEl.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const animate = (time) => {
      if (!window.__liquidGLRenderer__) return;
      renderer.render(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return renderer;
  };

  window.liquidGL.registerDynamic = function () {};

  window.liquidGL.syncWith = function (config) {
    if (config && config.lenis) {
      config.lenis.on("scroll", (e) => {
        if (window.__liquidGLRenderer__) {
          window.__liquidGLRenderer__.setScrollOffset(e.scroll);
        }
      });
    }
  };
})();
