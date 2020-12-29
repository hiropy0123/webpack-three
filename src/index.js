import * as THREE from 'three'

window.addEventListener('DOMContentLoaded', init)

function init() {
  // サイズの指定
  const width = 960
  const height = 540

  // レンダラーの作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas')
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  // シーンの作成
  const scene = new THREE.Scene()

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000)
  camera.position.set(0, 0, +1000)

  // オブジェクトの作成
  const geometry = new THREE.BoxGeometry(300, 300, 300)
  const material = new THREE.MeshStandardMaterial({
    color: 0xFF0000
  })
  const box = new THREE.Mesh(geometry, material)

  // シーンに追加
  scene.add(box)

  // ライト
  const light = new THREE.DirectionalLight(0xFFFFFF, 3)
  light.position.set(1, 1, 1)
  scene.add(light)

  tick()
  
  function tick() {
    box.rotation.x += 0.01
    box.rotation.y += 0.01
    renderer.render(scene, camera)

    requestAnimationFrame(tick)
  }
}
