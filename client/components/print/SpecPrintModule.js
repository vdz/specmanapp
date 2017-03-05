import React from 'react';
import { thumbnail, page } from '../../helpers/utils.js';

export class SpecPrintModule extends React.Component {

    getImages() {
        let result =[];
        const fields = this.props.spec.docs;

        fields && fields.forEach((item, index) => {
            let ext = item.url.substr(item.url.lastIndexOf('.')+1);

            let meta = {};
            if (item.meta) {
                try {
                    meta = JSON.parse(item.meta);
                } catch(e) {}
            }

            if (ext.toLowerCase() == 'pdf') {
                if (meta && meta.pages) {
                    for (let i=0;i<meta.pages;i++) {
                        result.push(
                            <figure key={'figure-'+item.id+'-'+index+'-'+i} className='full-size'>
                                <img src={thumbnail(page(item.url, i+1))} className='figure-image' />
                                <figcaption>{(index+1) + '. ' + item.label + ' p.'+(i+1)}</figcaption>
                            </figure>
                        );
                    }
                } else {
                    result.push(
                        <figure key={'figure-'+item.id+'-'+index} className='full-size'>
                            <img src={thumbnail(item.url)} className='figure-image' />
                            <figcaption>{(index+1) + '. ' + item.label}</figcaption>
                        </figure>
                    );
                }
            } else {
                result.push(
                    <figure key={'figure-'+item.id+'-'+index}>
                        <img src={item.url} className='figure-image' />
                        <figcaption>{(index+1) + '. ' + item.label}</figcaption>
                    </figure>
                )
            }
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