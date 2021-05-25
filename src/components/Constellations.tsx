function Constellations() {
  return (
    <div className="constellations-container">
    {_.map(_.take(_.sortBy(_.toPairs(party), 1).reverse(), 8), charPair => {
      let popularity = Math.round((charPair[1] / total * 1000)/10)
      let characterName = characterDb[charPair[0]].name;

      return (
        <div key={charPair[0]} className="bar-chart party-bar-container">
          <div 
            className={`bar-chart-bar party-bar ${characterDb[selectedCharacter].element.toLowerCase()}`} 
            style={{ height: `${popularity}%` }}
          >
            <Tooltip 
              alignment="vertical"
              content={`${characterName}: ${charPair[1]}`}
            />
          </div>
          <CharacterTile id={charPair[0]}>
            <div className="party-popularity">{Math.round(charPair[1]/total * 100)}%</div>
          </CharacterTile>
        </div>
      )
    })}
  </div>
  )
}