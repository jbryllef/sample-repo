import React from 'react';
import { Card } from 'react-bootstrap'

const {
    Title: CardTitle,
    Text: CardText,
    Subtitle: CardSubtitle,
    Link: CardLink,
} = Card

const ArticleCard = ({ article, handleClickEdit }) => {
    const {
        title,
        body,
        id,
    } = article
    return (
        <Card>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle className="mb-2 text-muted">---</CardSubtitle>
            <CardText>
                {body}
            </CardText>
            <CardLink onClick={() => handleClickEdit(id)}>Edit</CardLink>
        </Card>
    )
}

export default ArticleCard