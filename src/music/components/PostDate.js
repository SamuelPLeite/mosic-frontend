import React from "react"

import './PostDate.css'

function formatPostDate(postDate) {
  const now = new Date()
  const postTime = new Date(postDate)

  const timeDifference = now - postTime;
  const minutes = Math.floor(timeDifference / (1000 * 60))
  const hours = Math.floor(timeDifference / (1000 * 60 * 60))

  if (minutes < 60) {
    return `Posted ${minutes} mins ago`
  } else if (hours < 24) {
    return `Posted ${hours} hours ago`
  } else {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const formattedDate = `${monthNames[postTime.getMonth()]} ${postTime.getDate()}, ${postTime.getHours()}:${postTime.getMinutes().toString().padStart(2, '0')}`;
    return `Posted ${formattedDate}`
  }
}

const PostDate = ({ date, bottom }) => {
  console.log(date)
  return (
    <div className={!bottom ? 'post-date' : 'post-date-bottom'}>
      {formatPostDate(date)}
    </div>
  )
}

export default PostDate