document
  .getElementById('lamp-form')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    const length = parseFloat(document.getElementById('length').value)
    const width = parseFloat(document.getElementById('width').value)
    const numLamps = parseInt(document.getElementById('num-lamps').value)

    if (
      isNaN(length) ||
      isNaN(width) ||
      isNaN(numLamps) ||
      length <= 0 ||
      width <= 0 ||
      numLamps <= 0
    ) {
      alert('Por favor, insira valores válidos.')
      return
    }

    let lampPositions = document.getElementById('lamp-positions')
    let lampDistances = document.getElementById('lamp-distances')
    let canvas = document.getElementById('lamp-canvas')
    let ctx = canvas.getContext('2d')

    lampPositions.innerHTML = ''
    lampDistances.innerHTML = ''
    canvas.width = 500
    canvas.height = 250
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Desenhar o retângulo da sala
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100)

    ctx.font = '12px Arial'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'

    if (numLamps === 1) {
      const x = length / 2
      const y = width / 2
      lampPositions.innerHTML = `<p>A lâmpada deve ser instalada no centro da sala:</p>
                                 <p>Coordenadas: (${x.toFixed(2)}m, ${y.toFixed(
        2
      )}m)</p>`

      // Desenhar a lâmpada no centro
      drawLamp(ctx, 250, 125, 1)
    } else {
      let positions = []
      for (let i = 1; i <= numLamps; i++) {
        const x = (length / (numLamps + 1)) * i
        const y = width / 2
        positions.push({ x: x.toFixed(2), y: y.toFixed(2) })
      }

      lampPositions.innerHTML =
        '<p>As lâmpadas devem ser instaladas nas seguintes posições:</p>'
      positions.forEach((pos, index) => {
        lampPositions.innerHTML += `<p>Lâmpada ${index + 1}: Coordenadas (${
          pos.x
        }m, ${pos.y}m)</p>`
      })

      // Calcular e exibir distâncias
      let distances = calculateDistances(positions)
      lampDistances.innerHTML = '<p>Distâncias entre as lâmpadas:</p>'
      distances.forEach((distance, index) => {
        lampDistances.innerHTML += `<p>Distância entre Lâmpada ${
          index + 1
        } e Lâmpada ${index + 2}: ${distance.toFixed(2)}m</p>`
      })

      // Desenhar as lâmpadas
      positions.forEach((pos, index) => {
        const lampX = 50 + (canvas.width - 100) * (pos.x / length)
        const lampY = 125
        drawLamp(ctx, lampX, lampY, index + 1)
      })
    }

    // Calcular e exibir área total
    const areaTotal = length * width
    document.getElementById('area-info').innerHTML = `
    <p>Área total da sala: ${areaTotal.toFixed(2)} m²</p>
  `

    // Calcular e exibir área iluminada (exemplo simplificado)
    const areaIluminadaPorLampada = areaTotal / numLamps
    positions.forEach((pos, index) => {
      // ... (seu código existente) ...
      document.getElementById('area-info').innerHTML += `
      <p>Área iluminada por Lâmpada ${
        index + 1
      }: ${areaIluminadaPorLampada.toFixed(2)} m²</p>
    `
    })
  })

function drawLamp(ctx, x, y, number) {
  ctx.fillStyle = 'red'
  ctx.beginPath()
  ctx.arc(x, y, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = 'black'
  ctx.fillText(`Lâmpada ${number}`, x, y - 10)
}

function calculateDistances(positions) {
  let distances = []
  for (let i = 0; i < positions.length - 1; i++) {
    const x1 = parseFloat(positions[i].x)
    const y1 = parseFloat(positions[i].y)
    const x2 = parseFloat(positions[i + 1].x)
    const y2 = parseFloat(positions[i + 1].y)
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    distances.push(distance)
  }
  return distances
}
