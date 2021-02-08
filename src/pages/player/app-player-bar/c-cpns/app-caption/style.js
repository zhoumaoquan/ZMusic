import styled from 'styled-components';

export const CaptionWrapper = styled.div`
    display: flex;
    padding: 5px 30px 5px 30px;
    border-radius: 5px;
    font-size: 20px;
    color: #fff;
    background-color: rgba(0,0,0, .5);
    position: fixed;
    left: 50%;
    bottom: 80px;
    transform: translateX(-50%);
    z-index: 999;

    box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
`