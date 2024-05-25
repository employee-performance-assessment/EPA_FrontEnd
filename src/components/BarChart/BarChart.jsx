import './BarChart.scss';

function BarChart({completed, delayed}) {
  return (
    <div className='bar-cahrt'>
      <div className='bar-cahrt__completed' style={{ height: `${completed}%` }} />
      <div className='bar-cahrt__delayed' style={{ height: `${delayed}%` }} />
      <span className='bar-cahrt__text'>{completed}%</span>
      <span className='bar-cahrt__text'>{delayed}%</span>
    </div>
  )
}

export default BarChart;
