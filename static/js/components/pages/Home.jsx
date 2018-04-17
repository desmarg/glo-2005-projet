import * as React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <article>
                    <h2 className="article-title">GLO-2005 Recettes</h2>

                    <p>Bienvenue sur notre site de recette végétariennes!</p>                   


                    <a href="#" className="btn btn-primary">Read more</a>
                    <a href="#" className="btn btn-secondary">Comments</a>

                </article>

                <article>

                    <h2 className="article-title">Notre vision:</h2>

                    <h3>De bonnes recettes végétariennes, faciles d'accès</h3>

                    <p>Nous vous proposons uniquement des recettes contenant des ingrédients que vous possédez.</p>
                    <p>Pour commencer, ajoutez des ingrédients à votre garde-manger:</p>
                    <a href="/ingredients" className="btn btn-primary">Ajouter ingrédients</a>
                </article>
            </div>
        )
    }
}