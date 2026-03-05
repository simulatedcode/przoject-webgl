uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec3 color = uColor;
  color += sin(vPosition.y * 10.0 + uTime) * 0.1;

  gl_FragColor = vec4(color, 1.0);
}
