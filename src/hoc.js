
class Text extends React.Component {
    render(){
        return (
            <div>
                this is text 
            </div>

        )
    }
}

// 生命周期可以覆盖掉 
const hoc2 = Component => {
  return class NewHoc extends Component {
      static displayName = `NewHoc-${Component.displayName || Component.name}`
      render(){
          const element= super.render();
          console.log(element)
          const style = {
              color: element.type === 'div' ? 'red' : 'green'
          }
          const newProps = {...this.props, style}
          return React.cloneElement(element, newProps, element.props.children)
      }
  }
}