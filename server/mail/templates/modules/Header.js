import React from 'react';
import { Table, TBody, TD, TR } from 'oy-vey';

import EmptySpace from './EmptySpace';

const Header = props => {
  const style = {
    color: props.color || '#262626',
    fontWeight: 'bold'
  };

  return (
    <Table width="100%" height="120" color={props.color}>
      <TBody>
        <TR>
          <TD>
            <EmptySpace height={30} />

            {/* Text area, could be another component, i.e. HeroText */}
            <Table width="100%">
              <TBody>
                <TR>
                  <TD
                    align="center"
                    style={{ color: props.color, fontFamily: 'Arial' }}
                  >
                    Logo here
                  </TD>
                </TR>
              </TBody>
            </Table>
            <EmptySpace height={30} />
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};

export default Header;
