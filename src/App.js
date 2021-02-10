import React, { useEffect, useState } from 'react'
import './App.css'
import { Layout, Input } from 'antd'
import PostsList from './components/PostsList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsAction } from './store/postReducer'

const { Header, Content } = Layout

function App () {
  const [searchValue, setSearchValue] = useState('')
  const [currentlyDisplayed, setCurrentlyDisplayed] = useState([])

  const posts = useSelector(state => state.postReducer.posts)
  const dispatch = useDispatch()

  const loadPosts = () => {
    dispatch(fetchPostsAction())
  }

  const searchPosts = (searchText) => {
    setSearchValue(searchText)
    setCurrentlyDisplayed(posts.filter(i => i.body.includes(searchText)))
  }

  useEffect(() => loadPosts(), [])
  useEffect(() => setCurrentlyDisplayed(posts), [posts])

  return (
    <Layout className="root-layout">
      <Header>
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => searchPosts(e.target.value)}
        />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 20 }}>
        <div className="site-layout-background" style={{ padding: 24 }}>
          {
            posts.length <= 0
              ? <div style={{ textAlign: 'center' }}>No data</div>
              : <PostsList posts={currentlyDisplayed} />
          }
        </div>
      </Content>
    </Layout>
  )
}

export default App
