import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineLoading, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    background-image: url(https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?w=1060&t=st=1701062942~exp=1701063542~hmac=bfc8c76f240fe8332176dee6534a9c99b90f5f039252cc6a3153310c96c7a5a1);
    font-family: 'Lilita One', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

const Title = styled.h1`
    color: rgba(0, 0, 0, 0.646);
    font-size: 60px;
    word-spacing: 15px;
    text-align: center;
    letter-spacing: 2px;
    margin-top: 60px;
`;

const Span = styled.span`
    -webkit-text-stroke: 1px black;
    text-stroke: 4px rgb(255, 255, 255);
    color: aliceblue;
`;

const Wrapper = styled.div`
    height: 60vh;
    display: flex;
    border-radius: 10px;
    border: 3px solid black;
    padding: 20px 50px;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
`;

const ImageContainer = styled.div`
    height: 100%;
    width: 50vw;
    overflow: hidden;
    padding: 0px 30px;
`;

const ImageCarousel = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    gap: 100px;
    position: relative;
`;

const StyledImage = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 25px;
    position: absolute;
    transition: 1s;
    padding: 0px 15px;
`;

const Button = styled.button`
    cursor: pointer;
    padding: 10px;
    background-color: transparent;
    border-radius: 10px;
`;

const ImageSlider = ({ images }) => {
    const [counter, setCounter] = useState(0);

    const slideImage = () => {
        const transformedValue = `translateX(-${counter * 100}%)`;
        return transformedValue;
    };

    const prev = () => {
        if (counter > 0) {
            setCounter(counter - 1);
        }
    };
    
    const next = () => {
        if (counter <= images.length - 2) {
            setCounter(counter + 1);
        }
    };

    return (
        <Wrapper>
            <div>
                <Button className="active" id="prev" onClick={prev}>
                    <AiOutlineLeft/>
                </Button>
            </div>
            <ImageContainer>
                <ImageCarousel style={{ transform: slideImage() }}>
                    {images.map((image, index) => (
                        index>0&&<StyledImage key={index} src={image} alt={`Slide ${index + 1}`} />
                    ))}
                </ImageCarousel>
            </ImageContainer>
            <div>
                <Button className="active" id="next" onClick={next}>
                    <AiOutlineRight/>
                </Button>
            </div>
        </Wrapper>
    );
};

const Slider = () => {
    const images = [
        'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1561908818-526e64312efd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1503437313881-503a91226402?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1497493292307-31c376b6e479?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1663134285459-0022b0e78970?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];
    return (
       images&& <MainContainer>
            <Title>IMAGE <Span>SLIDER</Span></Title>
            <ImageSlider images={images} />
        </MainContainer>
    );
};

export default Slider;
