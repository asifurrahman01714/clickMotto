import React, {useState} from 'react'
import Menu from '../../Fakedata/Menu';

const GalleryReact = () => {

    const [items, setItems] = useState(Menu);
    console.log(Menu);
    const filterItem = (categItem) => {
        const updatedItems = Menu.filter((curElem) => {
            return curElem.category === categItem;
        });

        setItems(updatedItems);
    }

    return (
        <>
            <h3 className="mt-5 text-center main-heading">Search Your Favorite Photos And Videos With Category</h3>
            <hr />
            
            <div className="menu-tabs container">
                <div className="menu-tab d-flex justify-content-around">
                    <button className="btn btn-warning" onClick={() => filterItem('workspace')}>Workspace</button>
                    <button className="btn btn-warning" onClick={() => filterItem('summer')}>Summer</button>
                    <button className="btn btn-warning" onClick={() => filterItem('city')}>City</button>
                    <button className="btn btn-warning" onClick={() => filterItem('food')}>Food</button>
                    <button className="btn btn-warning" onClick={() => setItems(Menu)}>All</button>
                </div>
            </div>

            {/* my main items section  */}
            <div className="menu-items container-fluid mt-5">
                <div className="row">
                    <div className="col-11 mx-auto">
                        <div className="row my-5">
                            
                            {
                                items.map((elem) => {
                                    const { id, image } = elem;
                                    return (
                                    
                                        <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4 my-5">
                                            <div className="row Item-inside">
                                                {/* for images */}
                                                <div className="img-div">
                                                    <img src={image} alt={id} className="img-fluid shadow"/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GalleryReact;