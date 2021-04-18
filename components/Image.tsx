import React from 'react';
import Link from 'next/link';

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
                    <img src={src} className={optionalClassImage} alt={alt} />
                )}
            </div>
        );

        return (
            content
        );
    };

export default Image;