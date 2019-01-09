import NormalBar from '@/components/normalBar/index.js'

const components = [
    NormalBar
]

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    NormalBar
}