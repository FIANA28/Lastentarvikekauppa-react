import React from 'react';

export default function LoadingBox() {
  return (
    <div className="loader-msg">
     <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i> <span className="sr-only"> Loading ... </span>
    </div>
  );
}
