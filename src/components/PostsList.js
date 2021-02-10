import React, { useState } from 'react'
import { arrayOf, object } from 'prop-types'
import { Card, Col, Row, Modal } from 'antd'
import styles from './PostsList.module.css'

PostsList.propTypes = {
  posts: arrayOf(object)
}

function PostsList ({ posts }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})

  const showModal = (post) => {
    setSelectedPost(post)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    setSelectedPost({})
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedPost({})
  }

  const addElipsis = (str, length) => str.substring(0, length - 3) + '...'

  return (
    <div className={styles.root}>
      <Row gutter={16}>
        {
          posts.map(p =>
            (<Col span={8} key={p.id}>
              <Card
                className={styles.item}
                title={p.title}
                onClick={() => showModal(p)}
                hoverable
              >
                {addElipsis(p.body, 100)}
              </Card>
            </Col>)
          )
        }
      </Row>
      <Modal
        visible={isModalVisible}
        title={selectedPost.title}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{selectedPost.body}</p>
      </Modal>
    </div>
  )
}

export default PostsList
