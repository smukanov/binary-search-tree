import { FC } from "react"
import Tree from "react-d3-tree"
import { RenderCustomNodeElementFn, PathClassFunction } from "react-d3-tree/lib/types/types/common"

type CustomTreeProps = {
    data: any
    newChildValue: number
}

const CustomTree: FC<CustomTreeProps> = ({data, newChildValue}) => {
    // для позиционирования по центру
    const translate = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 10,
    }

    const renderCustomNodeElement: RenderCustomNodeElementFn = (a) => {
        const isNewChild = Number(a.nodeDatum.name) === newChildValue && !a.nodeDatum.children

        return (
            <>
              <circle 
                r={40} 
                style={{
                    fill: isNewChild ? 'yellow' : 'white', 
                    strokeWidth: 2,
                }}/>
              <foreignObject width={50} height={50}>
                <div style={{fontSize: 18}}>{a.nodeDatum.name}</div>
              </foreignObject>
            </>
          )
    }

    const pathClassFunc: PathClassFunction = (link) => { 
      const parent = Number(link.source.data.name)
      const child = Number(link.target.data.name)
      if (child >= parent){
        return 'left-branch'
      }

      return 'right-branch'
    }

    return (
        <Tree
            data={data} 
            collapsible={false}
            renderCustomNodeElement={renderCustomNodeElement}
            pathClassFunc={pathClassFunc}
            translate={translate}
            orientation={'vertical'}/>
    )
}

export default CustomTree