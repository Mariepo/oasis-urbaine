import React from 'react';


function HeaderProducts() {
    return <>
        <header className='header-products d-flex flex-wrap'>
            <div className='col-12 col-md-6 order-2 order-md-1 my-auto header-body'>
                <p className='fw-bolder'>🎁  Un produit offert avec chaque commande</p>
                <h1>Arbres fruitiers d’intérieur </h1>
            </div>
            <div className='col-12 col-md-6 order-1 order-md-2'>
                    <img src="/assets/images/header-products.png" alt="oranger, citrionnier et olivier miniatures" />
            </div>
        </header>
    </>
}

export default HeaderProducts
