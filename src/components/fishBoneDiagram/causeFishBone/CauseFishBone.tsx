import React from 'react';
import './CauseFishBone.css'; // Assuming you have a CSS file for styling

interface CauseFishBone {
    text: string;
	index?: number;
}

export default function CauseFishBone({ text, index = 0 }: CauseFishBone) {
	const isBoneUp = index % 2 === 0;
	const translateScale = (Math.floor(index / 2) * 450);

  	return (
		<div className={`cause-fish-bone cause-fish-bone-${isBoneUp ? 'up' : 'down'}`}>
			<svg fill="#000000" width="auto" height="180px" version="1.1" id={`cause-fish-bone-${index}`} xmlns="http://www.w3.org/2000/svg" viewBox="338 247 41 175" transform={`scale(-1, ${isBoneUp ? '-1' : '1'}) translate(${translateScale}, 0)`} transform-origin="center">
				<defs>
					<linearGradient id="boneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" style={{ stopColor: '#8B6C42', stopOpacity: 1 }} />
						<stop offset="33%" style={{ stopColor: '#CBA47F', stopOpacity: 1 }} />
						<stop offset="66%" style={{ stopColor: '#C2A385', stopOpacity: 1 }} />
						<stop offset="100%" style={{ stopColor: '#D6B894', stopOpacity: 1 }} />
					</linearGradient>
				</defs>

				<g>
					<g>
						<path d=""/>
					</g>
				</g>

				<path d="M 378.854 247.198 L 339.983 247.198 L 338.888 414.064 C 338.888 420.692 343.578 422.412 354.307 422.412 C 365.035 422.412 370.091 419.231 370.091 412.603 L 378.854 247.198 Z" style={{ strokeWidth: '1px', fill: 'url(#boneGradient)' }}/>

				<foreignObject x="340" y="250" width="75%" height="90%">
					<text style={{ transform: `scale(-1, ${isBoneUp ? '-1' : '1'})`, writingMode: 'vertical-lr', width: '100%', height: '100%', font: '20px sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }}>
						{text}
					</text>
				</foreignObject>
			</svg>
		</div>
  	);
}
