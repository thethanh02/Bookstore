import moment from 'moment';
import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';

const ItemReview = (review) => {
    return (
        <Comment key={review.id}>
            <Comment.Avatar src='/imgs/avtdefault.jpg' />
            <Comment.Content>
                <Comment.Author as='a'>{review.user.name}</Comment.Author>
                {/* <div /> */}
                <Comment.Metadata>
                    <div>{moment(review.createdAt).format('HH:mm:ss DD/MM/YYYY')}</div>
                    <div><Icon name='star' />{review.rating} Sao</div>
                </Comment.Metadata>
                <Comment.Text>{review.commentString}</Comment.Text>
            </Comment.Content>
        </Comment>
    );
};

export default ItemReview;