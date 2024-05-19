import './BarChart.scss';

function BarChart({completed, failure}) {
  return (
    <div className='bar-cahrt'>
      <div className='bar-cahrt__completed' style={{ height: `${completed}%` }} />
      <div className='bar-cahrt__failure' style={{ height: `${failure}%` }} />
      <span className='bar-cahrt__text'>{completed}%</span>
      <span className='bar-cahrt__text'>{failure}%</span>
    </div>
  )
}

export default BarChart;
