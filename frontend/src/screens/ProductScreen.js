import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('نظر شما ثبت شد');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('لطفا نظر خود را وارد کنید و امتیاز دهید');
    }
  };
  return (
    <div className="fixing">
    <div className="back-button" >
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="row top">
         <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    فروشنده{' '}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating>
                  </li>
                  <li>
                    <div className="row">
                      <div>قیمت</div>
                      <div className="price">{product.price} تومان</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>وضعیت</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">تعداد</span>
                        ) : (
                          <span className="danger">ناموجود</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>تعداد</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          اضافه کردن به سبد خرید
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1 product-name">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>توضیحات :<p>{product.description}</p></li>
              </ul>
            </div>
            
          </div>
          <div className ="product-border">
            <h2 id="reviews">نظرات</h2>
            {product.reviews.length === 0 && (
              <MessageBox>شما میتوانید اولین نظر در مورد این محصول را بدهید</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <div className="reviews-border">
                <li key={review._id}>
                  
                <p>{review.createdAt.substring(0, 10)}</p>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  
                  <p>{review.comment}</p>
                </li>
                </div>
              ))}

              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>نوشتن نظر </h2>
                    </div>
                    <div>
                      <label htmlFor="rating">امتیاز</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">انتخاب ...</option>
                        <option value="1">ضعیف</option>
                        <option value="2">منصفانه</option>
                        <option value="3">خوب</option>
                        <option value="4">خیلی خوب </option>
                        <option value="5">عالی </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">نظر </label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        تایید
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    لطفا برای ثبت نظر<Link to="/signin"> وارد شوید </Link>
                  </MessageBox>
                )}
              </li>
            </ul>
            
          </div>
        </div>
      )}
    </div>
  </div>
  );
}
