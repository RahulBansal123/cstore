import React from 'react';

const BarsIcon = () => {
  return <span className="bars-icon fa fa-bars" aria-hidden="true" />;
};

const CloseIcon = () => {
  return <span className="close-icon" aria-hidden="true" />;
};

const CheckIcon = ({ className = '' }) => {
  return (
    <svg
      className={`${className} check-icon`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
};

const RefreshIcon = ({ className = '', width = '20', height = '20' }) => {
  return (
    <svg
      className={`${className} refresh-icon`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
};

const AddressIcon = ({ className = '', width = '20', height = '20' }) => {
  return (
    <svg
      className={`${className} address-icon`}
      enableBackground="new 0 0 512 512"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="m470.793 489.077h-195.735v-109.064l97.868-88.713 97.867 88.713z"
          fill="#f8f7f7"
        />
        <path d="m439.887 351.998v137.079h30.906v-109.064z" fill="#efefef" />
        <path
          d="m411.042 489.203h-76.233v-73.01c0-21.051 17.065-38.117 38.117-38.117 21.051 0 38.117 17.065 38.117 38.117v73.01z"
          fill="#686169"
        />
        <path
          d="m233.9 117.204c0 104.853-105.051 201.285-116.95 201.285s-116.95-96.432-116.95-201.285c0-64.73 52.36-117.204 116.95-117.204s116.95 52.474 116.95 117.204z"
          fill="#ff6167"
        />
        <path
          d="m116.95 0c-5.239 0-10.396.351-15.453 1.02 57.285 7.579 101.497 56.704 101.497 116.184 0 84.985-69.009 164.433-101.497 191.491 7.595 6.325 13.198 9.794 15.453 9.794 11.899 0 116.95-96.432 116.95-201.285 0-64.73-52.36-117.204-116.95-117.204z"
          fill="#fe454a"
        />
        <circle cx="116.95" cy="117.204" fill="#f8f7f7" r="79.324" />
        <path
          d="m116.95 37.88c-5.287 0-10.452.531-15.453 1.522 36.366 7.211 63.871 39.35 63.871 77.802s-27.505 70.591-63.871 77.802c5.001.991 10.165 1.522 15.453 1.522 43.739 0 79.324-35.585 79.324-79.324s-35.584-79.324-79.324-79.324z"
          fill="#efefef"
        />
        <path
          d="m504.92 386.251-121.562-111.259c-5.903-5.405-14.962-5.405-20.865 0l-121.561 111.259c-6.296 5.762-6.728 15.536-.967 21.832 5.763 6.295 15.538 6.727 21.832.966l111.129-101.711 111.129 101.711c2.965 2.714 6.702 4.054 10.429 4.054 4.184 0 8.355-1.69 11.403-5.02 5.761-6.296 5.328-16.07-.967-21.832z"
          fill="#ff6167"
        />
        <g fill="#7b727b">
          <path d="m209.033 445.186h-28.606c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h28.606c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z" />
          <path d="m154.118 445.186h-17.687c-6.606 0-11.981-5.375-11.981-11.982v-24.473c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v24.473c0 14.878 12.104 26.982 26.981 26.982h17.687c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z" />
          <path d="m116.95 389.816c4.143 0 7.5-3.358 7.5-7.5v-26.476c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v26.476c0 4.142 3.358 7.5 7.5 7.5z" />
        </g>
        <path
          d="m496.547 512h-247.243c-8.534 0-15.453-6.918-15.453-15.453 0-8.534 6.918-15.453 15.453-15.453h247.243c8.534 0 15.453 6.918 15.453 15.453 0 8.535-6.918 15.453-15.453 15.453z"
          fill="#e07f5d"
        />
        <path
          d="m496.547 481.095h-30.905c8.534 0 15.453 6.919 15.453 15.453s-6.919 15.453-15.453 15.453h30.905c8.534 0 15.453-6.919 15.453-15.453 0-8.535-6.919-15.453-15.453-15.453z"
          fill="#d06d4a"
        />
      </g>
    </svg>
  );
};

const TrashIcon = ({ className = '', width = '20', height = '20' }) => {
  return (
    <svg
      className={`${className} trash-icon`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
};

const ArrowBackIcon = ({ className = '', width = '20', height = '20' }) => {
  return (
    <svg
      className={`${className} arrow-left-icon`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
};

export {
  BarsIcon,
  CloseIcon,
  CheckIcon,
  RefreshIcon,
  AddressIcon,
  TrashIcon,
  ArrowBackIcon,
};
