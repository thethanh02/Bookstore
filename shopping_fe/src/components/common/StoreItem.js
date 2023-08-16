import { Card, Grid, Image } from "semantic-ui-react";
import { formatCurrency } from "../utils/formatCurrency"
import { Link } from "react-router-dom";
import moment from 'moment';
import { getCloudinaryImg } from "../utils/cloudinaryUtils"

export function StoreItem(book) {

    return (
        <Grid.Column>
            <Card link as={Link} to={`/products/${book.id}`}>
                {console.log(getCloudinaryImg(book.imgUrl))}
                <Image src={getCloudinaryImg(book.imgUrl)} style={{ aspectRatio: 3/4 }} />
                {/* <Image src={book.imgUrl} wrapped ui={false}/> */}
                <Card.Content>
                    <Card.Header>{book.title.length > 35 ? book.title.substr(0, 35) + '...' : book.title}</Card.Header>
                    <Card.Meta>
                        <span style={{ color: 'red' }}>{formatCurrency(book.price)}</span>
                        <span style={{ float: 'right' }}>{moment(book.releaseDate).format('DD/MM/YYYY')}</span>
                    </Card.Meta>
                    <Card.Description>
                    </Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}