// @flow

import React from 'react';
import Box from './Box';
import BoxWithContent from './BoxWithContent';
import withTransition from '../../../../src/withTransition';

const Container = ({ children, className }: any) => (
  <div className={className}>
    {children}
  </div>
);

const BoxWithTransition = withTransition([{
  transition: 'expand',
  duration: 0.5,
  background: '#541219',
  autoStart: true,
  cover: true,
}, {
  transition: 'move',
  duration: 0.5,
  matchSize: true,
}])(Box);

const items = [{
  name: 'First Order',
  src: 'first-order.jpg',
  description: (
    <content>
      <p>
        {"The First Order, simply referred to as the Order, was a political and military faction—ruled by Supreme Leader Snoke and allied with the Knights of Ren—that came into existence as a result of the fall of the Galactic Empire. In the aftermath of the Battle of Jakku, the Empire formally surrendered to the New Republic by signing the Galactic Concordance, a peace treaty that marked the end of the Galactic Civil War in 5 ABY. In spite of its collapse the Empire's legacy survived in the Unknown Regions of the galaxy where former members of the Imperial Military plotted their return to power. Their cause would grow in support through some Imperial sympathizers who briefly inhabited a wing of Republic politics before abandoning the nascent democracy to join the Imperial-based movement in the Unknown Regions. Inspired by the fascist ideals of the Empire, this movement ultimately resulted in the formation of the First Order."}
      </p>

      <p>
        {"In the decades that followed the Empire's defeat, the First Order gradually built its strength through the secret mobilization of new fleets and armies in violation of the Galactic Concordance and Republic law. Despite further acts of defiance to the treaty, the Galactic Senate did not regard the First Order as a serious threat to the Republic. However, the Senate's inaction motivated the Rebel veteran Princess Leia Organa to found the Resistance. Although the First Order became entangled in a conflict with Organa's group, the Republic remained its primary target. After thirty years of plotting their revenge against the government that overthrew the Empire, the First Order test-fired the superweapon of Starkiller Base on the Hosnian system and thereby destroyed Hosnian Prime, the capital world of the Republic. Shortly thereafter, the Resistance launched a counterattack that resulted in the base's destruction."}
      </p>
    </content>
  ),
}, {
  name: 'Emporer',
  src: 'emporer.jpg',
}, {
  name: 'Darth Maul',
  src: 'darth-maul.jpg',
}, {
  name: 'Boba Fett',
  src: 'boba-fett.jpg',
}, {
  name: 'Ben Kenobi',
  src: 'ben.jpeg',
}, {
  name: 'Captain Phasma',
  src: 'phasma.jpg',
}];

export default class App extends React.Component {
  state = {
    big: false,
    item: items[0],
  };

  componentDidMount () {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.setState({
          big: false,
        });
      }
    });
  }

  select = (item: any) => {
    this.setState((prevState) => ({
      big: !prevState.big,
      item,
    }));
  };

  render () {
    return (
      <div className="root">
        {this.state.big && (
          <Container>
            <BoxWithContent onClick={this.toggle} {...this.state.item} />
          </Container>
        )}

        {this.state.big || (
          <Container className="container">
            <img alt="Empire Insignia" src={`${require('../images/logo.png')}`} className="insignia" />

            <div className="container-inner">
              {items.map((item) => (
                <BoxWithTransition
                  {...item}
                  key={item.name}
                  type="small"
                  className="box-highlighted"
                  transitionPair={item.name}
                  onClick={() => this.select(item)}
                />
              ))}
            </div>

            <div className="vader-container">
              <div className="vader-bg" />
            </div>
          </Container>
        )}
      </div>
    );
  }
}
