/**
 *
 * AddProduct
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const AddProduct = (props) => {
  const {
    user,
    productFormData,
    formErrors,
    productChange,
    addProduct,
    brands,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct();
  };

  return (
    <div className="add-product">
      <h1 />
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs="12" lg="6">
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Product Name'}
              value={productFormData.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Product Description'}
              value={productFormData.description}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" lg="6">
            <Input
              type={'number'}
              error={formErrors['quota']}
              label={'Quantity'}
              name={'quota'}
              decimals={false}
              placeholder={'Product Quantity'}
              value={productFormData.quota}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" lg="6">
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Price'}
              name={'price'}
              min={1}
              placeholder={'Product Price'}
              value={productFormData.price}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <SelectOption
              disabled={user.role === 'SELLER'}
              error={formErrors['brand']}
              name={'brand'}
              label={'Select Brand'}
              value={user.role === 'SELLER' ? brands[1] : productFormData.brand}
              options={brands}
              handleSelectChange={(value) => {
                productChange('brand', value);
              }}
            />
          </Col>
          {console.log(productFormData)}
          <Col xs="12" md="12">
            <Input
              type={'text'}
              error={formErrors['image']}
              label={'Image'}
              name={'image'}
              placeholder={'Product Image'}
              value={productFormData.image}
              onInputChange={(name, value) => {
                productChange('image', value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className="add-product-actions">
          <Button type="submit" text="Add Product" />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
