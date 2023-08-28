// import 'src/components/landing-page/companies/Companies.css'
import './CompaniesCards.css';
import React, { useState } from 'react';
import add_to_wish_list from './img/add_to_wish_list.svg';
import in_wish_list from './img/in_wish_list.svg'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const MainCompanies = ({ companyData }) => {
    const navigate = useNavigate();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    
    const [isInWishList, setIsInWishList] = useState(false);
    // const user = ...                                                                             // add here to find user id

    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ${user.token}',                                                   // user token here
        },
    };

    // companies profile_id
    const data = {
        company_pk: companyData.profile_id,
    };

    // check if company in wish list
    axios.post('check-wish-list/', data, options)
        .then(response => {
            setIsInWishList(response.data.exists);
        })
        .catch(error => {
            console.log(error);
        });

    // add company to wish list 
    const addToWishList = () => {
        axios.post('add-to-wish-list/', data, options)
            .then(response => {
                setIsInWishList(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const loginPage = () => {
        navigate(`/authorization`);
    }; 

    return (
        <div className="product-card">
            <div className="product-card__block">
                <div className="product-card__image-frame">
                    <Link className='product-card__name-text_link' to={`/company/${companyData.profile_id}`}>
                        <img className="product-card__image" src={companyData.comp_banner_image} alt={companyData.comp_name} />
                        </Link>
                </div>
                <div className="product-card__text-block">
                    <div className="product-card__text-block__header">
                        <div className="product-card__category-text align_items_left">{companyData.comp_category.map(category => category.name).join(' ')}</div>
                        <div className="product-card__name-text align_items_left">
                            <Link className='product-card__name-text_link' to={`/company/${companyData.profile_id}`}>{companyData.comp_name}</Link>
                            <br />
                        </div>
                    </div>
                    <div className="product-card__address-text align_items_left">{companyData.comp_address}</div>
                    <div className="product-card__badges-block">
                        <div className="product-card__badges">
                            <div className="product-card__badge">
                                <div className="product-card__badge-text">{currentYear - companyData.comp_year_of_foundation} років досвіду</div>
                            </div>
                        </div>
                    </div>                                                                                          
                        {/* { !user  && (                                                                               // add user data here if user is not authorized redirect to login page
                            <button className='product-card__buttons' onClick={() => loginPage()}>
                                <img src={add_to_wish_list} width="25" height="25" alt="addToWhishList"/>
                            </button>
                        )}
                        { user && isInWishList && (                                                                     // add user data here if user is authorized add com in wish list                                                                               
                            <button className='product-card__buttons'>
                                <img src={in_wish_list} width="40" height="40" alt="inWishList"/>  
                            </button>                                                                                            
                        )}
                        { user && !isInWishList && (                                                                    // add user data here if user is authorized add com not in wish list      
                            <button className='product-card__buttons' onClick={addToWishList}>                          
                                <img src={add_to_wish_list} width="25" height="25" alt="addToWhishList"/>
                            </button>
                        )} */}

                        {/* add check user && wish list here */}                                                       
                        <button className='product-card__buttons' onClick={() => loginPage()}>  
                            <img src={add_to_wish_list} width="25" height="25" alt="addToWhishList"/>  
                        </button>
                    <div>

                    </div>
                </div>
            </div>
            <div className="product-card__logo">
                <div className="product-card__logo-ellipse">
                <img className="product-card__logo-image"  alt=""/>
                </div>
            </div>
        </div>





// { !user  && (                                                                                    // add user data here if user is not authorized redirect to login page
// <button className='product-card__buttons' onClick={addToWishList}>
//     <img src={add_to_wish_list} width="25" height="25" alt="addToWhishList"/>
// </button>
// //                        )}
// //                        { user && isInWishList && (                                                                     // add user data here if user is authorized add com in wish list                                                                               
// <button className='product-card__buttons'>
//     <img src={in_wish_list} width="25" height="25" alt="inWishList"/>  
// </button>                                                                                            
// //                       )}
// //                            {user && !isInWishList && (                                                                    // add user data here if user is authorized add com not in wish list      
//     <button className='product-card__buttons' onClick={addToWishList}>                          
//     <img src={add_to_wish_list} width="25" height="25" alt="addToWhishList"/>
// </button>
// //                       )}

// {/* add check user && wish list here */}                                                       
// <button className='product-card__buttons'>  
// <img src={add_to_wish_list} width="25" height="25" alt="inWishList"/>  
// </button> 



        // <div className="product-card">
        //     <div className="product-card__block">
                
        //         <div className='product-card__image-frame'>
        //             <image className='product-card__image' src={companyData.comp_banner_image} alt={companyData.comp_name}/>
        //         </div>
        //         <div className="product-card__text-block">
        //             <div className="product-card__text-block__header">
        //                 <div className='product-card__category-text'>
        //                     {}
        //                 </div>




        //                 <div><a href='#' className="product-card__name-text">{companyData.comp_name}</a></div>
        //                 <div className="product-card__address-text">{companyData.comp_common_info}</div>
        //                 <div className="product-card__badges-block">{companyData.comp_product_info}</div>
        //                 <div>
        //                     <button className='product-card__buttons'><img src={like_logo} width="25" height="25" alt=""/></button>
        //                     <button className='product-card__buttons'><img src={wish_list_checklist} width="25" height="25" alt=""/></button>
        //                 </div>
        //             </div>
        //             <div className='product-card__addtess-text'>
        //                 {companyData.comp_address}
        //             </div>
        //             <div className='product-card__budges-block'>

        //             </div>
        //         </div>
        //     </div>
        //     <div className='product-card__logo'>

        //     </div>
        // </div>
    );

};

export {MainCompanies};