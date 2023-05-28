import { Card, Image, Rating } from "semantic-ui-react";
import { formatCurrency } from "../utils/formatCurrency"
import { Link } from "react-router-dom";

export function StoreItem(book) {

    return (
        <Card link as={Link} to={`/books/${book.id}`}>
            <Image src={book.imgUrl} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{book.title.length > 35 ? book.title.substr(0, 35) + '...' : book.title}</Card.Header>
                <Card.Meta>
                    <span />
                    <span className='date' style={{ float: 'right' }}><Rating icon='star' defaultRating={3} maxRating={5} /></span>
                </Card.Meta>
                <Card.Meta>
                    <span style={{ color: 'red' }}>{formatCurrency(book.price)}</span>
                    <span className='date' style={{ float: 'right' }}>{book.releaseDate}</span>
                </Card.Meta>
                <Card.Description>
                    {book.description.length > 100 ? book.description.substr(0, 100) + '...' : book.description}
                </Card.Description>
            </Card.Content>
        </Card>
    );
}