import { Card, Grid, Image, Rating } from "semantic-ui-react";
import { formatCurrency } from "../utils/formatCurrency"
import { Link } from "react-router-dom";

export function StoreItem(book) {

    return (
        <Grid.Column>
            <Card link as={Link} to={`/books/${book.id}`}>
                <Image src={book.imgUrl} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{book.title.length > 35 ? book.title.substr(0, 1).toUpperCase() + book.title.substr(1, 35).toLowerCase() + '...' : book.title.substr(0, 1).toUpperCase() + book.title.substr(1).toLowerCase()}</Card.Header>
                    <Card.Meta>
                        <span style={{ color: 'red' }}>{formatCurrency(book.price)}</span>
                        <span style={{ float: 'right' }}><Rating icon='star' defaultRating={3} maxRating={5} disabled /></span>
                    </Card.Meta>
                    <Card.Description>
                    </Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}