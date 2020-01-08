import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// export const query = graphql`
// query ($slug: String!) {
//     markdownRemark (
//         fields: { slug: {eq:$slug}}
//     ) {
//         frontmatter {
//             title
//             date
//         }
//         html
//     }
// }`


export const query = graphql`
    query ($slug: String) {
        contentfulBlogPost (slug: {eq: $slug}) {
            title
            publishedDate (formatString : "MMMM Do, YYYY")
            postBody {
                json
            }
        }
    }
`


const Blog = (props) => {

    const options = {
        renderNode: {
            "embedded-asset-block": (node) => {
                // const alt = node.data.target.fields.title
                // const url = ''
                // return <img /*alt={alt}*/ src={url} />
            }
        }
    }

    return (
        <Layout>
            {/* <h1>{props.data.markdownRemark.frontmatter.title}</h1>
            <p>{props.data.markdownRemark.frontmatter.date}</p>
            <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div> */}
            <h1>{props.data.contentfulBlogPost.title}</h1>
            <p>{props.data.contentfulBlogPost.publishedDate}</p>
            {documentToReactComponents(props.data.contentfulBlogPost.postBody.json, options)}
            <Link to="/blog">Back To Blog</Link>
        </Layout>
    )
}


export default Blog