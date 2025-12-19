import Card from './Card';

function Preview({ data }) {
  return (
    <section className='preview'>
      <div
        className='projectImage'
        style={{ backgroundImage: data.photo && `url(${data.photo})` }}
      ></div>
      <Card data={data} />
    </section>
  );
}

export default Preview;
