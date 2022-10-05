const { floor, random } = Math
const query = document.querySelector.bind(document)
const setCSSProperty = (key, value) => {
  document.documentElement.style.setProperty(key, value)
}

const createQuestion = ({ angle, character }) => {
  return `
    <span class="question" style="--angle: ${angle}deg">
      ${character}
    </span>
  `
}

const createQuestions = ({ count, step, initialAngle, character }) => {
  const questions = []
  let i = 0;
  let angle = initialAngle
  while (i++ < count) {
    angle += step
    const question = createQuestion({ angle, character })
    questions.push(question)
  }
  return questions.join('')
}

const render = () => {
  container.innerHTML = createQuestions(state)
}

const state = {
  count: 500,
  step: -45,
  character: "){",
  initialAngle: floor(random() * 360)
}

const container = query('#questions-container')

const controls = [
  {
    id: 'count',
    handler: value => parseInt(value, 10)
  },
  {
    id: 'step',
    handler: value => parseInt(value, 10)
  },
  {
    id: 'initialAngle',
    handler: value => parseInt(value, 10)
  },
  { id: 'character' },
  {
    id: 'width',
    handler: value => {
      setCSSProperty('--canvas-width', `${value}px`)
      return `${value}px`
    }
  },
  {
    id: 'height',
    handler: value => {
      setCSSProperty('--canvas-height', `${value}px`)
      return `${value}px`
    }
  },
  {
    id: 'background',
    handler: value => {
      setCSSProperty('--background', value)
      return value
    }
  },
  {
    id: 'color',
    handler: value => {
      setCSSProperty('--color', value)
      return value
    }
  },
  {
    id: 'x-gap',
    handler: value => {
      setCSSProperty('--x-gap', `${value}px`)
      return `${value}px`
    }
  },
  {
    id: 'y-gap',
    handler: value => {
      setCSSProperty('--y-gap', value)
      return value
    }
  },
]

controls.forEach(({ id, handler = _ => _ }) => {
  const element = query(`#${id}`)
  element.addEventListener('input', (e) => {
    const value = e.currentTarget.value
    state[id] = handler(value)
    render()
  })
})

render()