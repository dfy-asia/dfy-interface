import React from 'react'
import styled from 'styled-components'

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 40 !important;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(14, 14, 14, 0.4);
`

const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  --webkit-transform: translate(-50%, -50%);
  padding: 25px;
  min-width: 450px;
  background-color: #ffffff;
  border-radius: 8px;
`

function MakeOfferDialog(): JSX.Element {
  return <>
    <Modal>
      <ModalBody>
        <div className="text-xl text-center py-3">Make an Offer</div>
        <div>
          <table width="100%">
            <tbody>
              <tr>
                <td>Price</td>
                <td className="text-right">Balance {0.01}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </ModalBody>
    </Modal>
  </>
}

export default MakeOfferDialog