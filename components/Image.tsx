import React from 'react';
import Link from 'next/link';
import ImageNext from 'next/image';

const Image = (
    {
        src = '',
        optionalClassImage='',
        optionalClassContainer='',
        alt='A pokemon',
        linkTo = '',
        onClick = () => {}
    }) => {
        const content = (
            <div className={optionalClassContainer}>
                {linkTo ? (
                    <Link href={linkTo}>
                        <img src={src} className={optionalClassImage} alt={alt} onClick={onClick} />
                    </Link>
                ) : (
                    <ImageNext src={src} className={optionalClassImage} alt={alt} width={100} height={100} />
                )}
            </div>
        );

        return (
            content
        );
    };

export default Image;