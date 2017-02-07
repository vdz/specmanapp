import React from 'react';

export class SpecPrintModule extends React.Component {

    getImages() {
        let result =[];
        const fields = this.props.spec.docs;

        fields && fields.forEach((item, index) => {
            result.push(
                <figure key={'figure-'+item.id+'-'+index}>
                    <img src={item.url} className='figure-image' />
                    <figcaption>{(index+1) + '. ' + item.label}</figcaption>
                </figure>
            )
        });
        return (
            <div className='spec-images'>
                { result }
            </div>
            );
    }

    getFields() {
        let result =[];
        const fields = this.props.spec.fields;

        fields && fields.forEach((item, index) => {
            result.push(<dt key={'dt-'+item.id+'-'+index}>{item.label}</dt>);
            result.push(<dd key={'dd-'+item.id+'-'+index}>{item.value}</dd>);
        });
        return (
            <dl className='spec-fields'>
                { result }
            </dl>
        );
    }

    render() {
        const { spec } = this.props;
        const images = this.getImages();
        const fields = this.getFields();
        
        return (
            <section className='Spec'>
                <h3 className='spec-title'>
                    {spec.name}
                </h3>
                <p className='spec-desc'>
                    {spec.description}
                </p>
                <div className='spec-info'>
                    { images }
                    { fields }
                </div>
            </section>
        )
    }
}