import './PictureNoData.scss';

function PictureNoData({ title }) {
  return (
    <div className='picture'>
      <div className='picture__flyman' />
      <span className='picture__title'>{title}</span>
    </div>
  )
}

export default PictureNoData;
