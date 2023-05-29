import { Card, Grid, Image, Rating } from "semantic-ui-react";
import { formatCurrency } from "../utils/formatCurrency"
import { Link } from "react-router-dom";

export function StoreItem(book) {

    return (
        <Grid.Column>
            <Card link as={Link} to={`/products/${book.id}`}>
                <Image src={book.imgUrl} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{book.title.length > 35 ? book.title.substr(0, 35) + '...' : book.title}</Card.Header>
                    <Card.Meta>
                        <span><Rating icon='star' defaultRating={3} maxRating={5} disabled /></span>
                        <span className='date' style={{ float: 'right' }}>{book.releaseDate}</span>
                    </Card.Meta>
                    <Card.Meta>
                        <span style={{ color: 'red' }}>{formatCurrency(book.price)}</span>
                    </Card.Meta>
                    <Card.Description>
                    </Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}