import React from 'react'


export function dateConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp * 1000);
  let year = a.getFullYear();
  let month = a.getMonth();
  month = month < 10 ? '0' + month : month

  let date = a.getDate();
  date = date < 10 ? '0' + date : date

  return year + '-' + month + '-' + date;
}


export function toHumanDate(dateStr)
{
  const [year, month, day] = dateStr.split("-")
  const date = new Date(year, month-1, day);
  return date.toLocaleDateString();
}


export function rateToPrice(rate, decimals)
{
  decimals = (decimals===undefined)? 18: decimals;
  return 10**(18-decimals)/rate;
}


export const FormatAddress = (props) => {

  const color = (props.color === undefined) ? {color: '#FFFFFF'} : {color: props.color};

  return  <a href={'https://kovan.etherscan.io/' + props.address}
                    target='_blank'
                    style={color}>
                    {props.address}
          </a>
}

export const formatPrice = (price, decimals) => {
    decimals = (decimals===undefined)? 0: decimals;
    return parseFloat(parseFloat(price/10**decimals).toFixed(5))

}


export default dateConverter;
