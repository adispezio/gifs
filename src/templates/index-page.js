import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import bytes from 'bytes'

import Layout from '../components/Layout'
import MaterialTable from "material-table";
import MouseTooltip from 'react-sticky-mouse-tooltip';


class GifRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
      isMouseTooltipVisible: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    let gif = this.props.gif


    return (
      <div>
      <a className="gif-link" onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
          href={"/" + gif.name + gif.ext}
          >{gif.name}{gif.ext}
      </a>
      <div style={{position: "relative"}}>
        {
          this.state.isHovering &&
          <MouseTooltip
          visible={true}
          offsetX={15}
          offsetY={10}
        >        
          <img 
            src={gif.publicURL} 
            style={
              {
                position: "absolute",
                left: "20px",
                top: "20px",
                maxWidth: "300px",
                maxHeight: "none"
              }
            }/>
          </MouseTooltip>
        }
      </div>
      </div>
    )
  }
}

export default ({ data }) => (
  <Layout>
    <MaterialTable
          columns={[
            {
              field: 'name',
              title: 'Name',
              defaultSort: "asc"  ,
              render: rowData => <GifRow gif={rowData} />
            },
            { title: "Modified", field: "modifiedTime", type: "date" },
            {
              field: 'size',
              title: 'Size',
              type: "numeric",
              render: rowData => <div>{bytes(rowData.size)}</div>
            }
          ]}
          data={data.allFile.nodes}
          title="gifs.dispez.io"
          style={
            {
              boxShadow: "none",
              borderBottom: "0px",
              bottom: "0",
              position: "relative"
            }
          }
          options={{
            sorting: true,
            pageSize: 250
          }}
        />
    {/* {data.allFile.nodes.map(({ node }) => (
        {"foo"}
      ))} */}
  </Layout>
)


export const query = graphql`
  query gifQuery {
    allFile(filter: {sourceInstanceName: {eq: "gifs"}}) {
      nodes {
        id
        name
        publicURL
        modifiedTime
        extension
        ext
        size
      }
    }
  }
`