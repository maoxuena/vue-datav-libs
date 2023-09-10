import Test from './components/Test/index'
import Icon from './components/Icon/index'
import SvgAnimation from './components/SvgAnimation/index'
import Logo from './components/Logo/index'
import Loading from './components/Loading/index'
import FlyBox from './components/FlyBox/index'
import Container from './components/Container/index'
import VueCountTo from './components/VueCountTo/index'
import VueEcharts from './components/VueEcharts/index'
import BaseScrollList from './components/BaseScrollList/index'

export default function (Vue) {
  Vue.use(Test)
  Vue.use(Icon)
  Vue.use(SvgAnimation)
  Vue.use(Logo)
  Vue.use(Loading)
  Vue.use(FlyBox)
  Vue.use(Container)
  Vue.use(VueCountTo)
  Vue.use(VueEcharts)
  Vue.use(BaseScrollList)
}