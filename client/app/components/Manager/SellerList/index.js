/**
 *
 * SellerList
 *
 */

import React from 'react';

import { dateFormat } from '../../../helpers';
import Button from '../../Common/Button';
import { CheckIcon, RefreshIcon, TrashIcon } from '../../Common/Icon';

const SellerList = (props) => {
  const { sellers, approveSeller, rejectSeller, deleteSeller } = props;

  return (
    <div className="seller-list">
      {sellers.map((seller, index) => (
        <div key={index} className="seller-box">
          <div className="mb-3 p-4">
            <label className="text-black">Business</label>
            <p className="fw-2 text-truncate">{seller.business}</p>
            <label className="text-black">Brand</label>
            <p className="text-truncate">{seller.brand}</p>
            <label className="text-black">Name</label>
            <p className="text-truncate">{seller.name}</p>
            <label className="text-black">Email</label>
            <p className="text-truncate">
              {seller.email ? seller.email : 'N/A'}
            </p>
            <label className="text-black">Phone Number</label>
            <p>{seller.phoneNumber}</p>
            <label className="text-black">Request date</label>
            <p>{dateFormat(seller.created)}</p>

            <hr />

            {seller.status === 'Approved' ? (
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0">
                <div className="d-flex flex-row mx-0">
                  <CheckIcon className="text-green" />
                  <p className="ml-2 mb-0">Approved</p>
                </div>

                <Button
                  className="mt-3 mt-lg-0"
                  text="Delete"
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteSeller(seller._id)}
                />
              </div>
            ) : seller.status === 'Rejected' ? (
              <>
                <div className="d-flex align-items-center mb-3">
                  <RefreshIcon className="text-primary" />
                  <p className="fw-2 ml-3 mb-0">Re Approve Seller</p>
                </div>
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0">
                  <Button
                    className="text-uppercase"
                    variant="primary"
                    size="md"
                    text="Approve"
                    onClick={() => approveSeller(seller)}
                  />
                  <Button
                    className="mt-3 mt-lg-0"
                    text="Delete"
                    icon={<TrashIcon width={15} />}
                    onClick={() => deleteSeller(seller._id)}
                  />
                </div>
              </>
            ) : seller.email ? (
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0">
                <div className="d-flex flex-column flex-lg-row mx-0">
                  <Button
                    variant="dark"
                    className="text-uppercase"
                    size="md"
                    text="Approve"
                    onClick={() => approveSeller(seller)}
                  />
                  <Button
                    variant="danger"
                    className="mt-3 mt-lg-0 ml-lg-2 text-uppercase"
                    size="md"
                    text="Reject"
                    onClick={() => rejectSeller(seller)}
                  />
                </div>
                <Button
                  className="mt-3 mt-lg-0"
                  text="Delete"
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteSeller(seller._id)}
                />
              </div>
            ) : (
              <>
                <p className="text-truncate">
                  Seller doesn't have email. Call at
                  <a
                    href={`tel:${seller.phoneNumber}`}
                    className="text-primary"
                  >
                    {' '}
                    {seller.phoneNumber}
                  </a>
                </p>
                <Button
                  className="w-100 w-lg-auto"
                  text="Delete"
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteSeller(seller._id)}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerList;
