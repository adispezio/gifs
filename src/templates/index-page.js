import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import bytes from 'bytes'

import Layout from '../components/Layout'
import MaterialTable from "material-table";
import MouseTooltip from 'react-sticky-mouse-tooltip';


function HoverWrapper({ data }) {
  const [gifURL, setGifURL] = useState('');
  return <>
    <MaterialTable
          columns={[
            {
              field: 'name',
              title: 'Name',
              defaultSort: "asc"  ,
              render: rowData => <GifRow gif={rowData} updateGifURL={(gifURL) => setGifURL(gifURL)}/>
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
            pageSize: 150,
            searchFieldAlignment: "left",
          }}
        />
      <MouseTooltip
      visible={true}
      offsetX={15}
      offsetY={10}
    >        
      <img 
        src={gifURL}
        style={
          {
            position: "absolute",
            left: "20px",
            top: "20px",
            maxWidth: "300px",
            maxHeight: "none",
            zIndex: "200"
          }
        }
          
        />
      </MouseTooltip>
  </>;
}


class GifRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      isMouseTooltipVisible: false
    };
  }

  handleMouseEnter(gif) {
    let gifURL = "" + gif.name + gif.ext;
    this.props.updateGifURL(gifURL);
  }

  render() {
    let gif = this.props.gif

    return (
      <div>
      <a className="gif-link" onMouseEnter={() => this.handleMouseEnter(gif)}
          href={"" + gif.name + gif.ext}
          >{gif.name}{gif.ext}
      </a>
      </div>
    )
  }
}

export default ({ data }) => (
  <Layout>
  <HoverWrapper data={data} />
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
