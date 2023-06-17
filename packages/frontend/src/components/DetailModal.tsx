import React from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import MakeOfferModal from './MakeOfferModal'
import Tooltip from '../components/Tooltip'
import './detailModal.css'

import Trustlist from '../contexts/Trustlist'
import User from '../contexts/User'

type Props = {
  listing: {
    _id: string;
    epoch: number | undefined,
    section: string;
    title: string;
    amount: string;
    amountType: string;
    description: string;
    posterId: string;
    pScore1: string;
    pScore2: string;
    pScore3: string;
    pScore4: string;
    offerAmount: string;
    responderId: string;
    dealOpened: boolean;
    dealClosed: boolean;
  };
  setShowDetail: (value: boolean) => void;
}

type Offer = {
  _id: string,
  offerAmount: string;
  responderId: string;
  rScore1: string;
  rScore2: string;
  rScore3: string;
  rScore4: string;
}

export default observer(({ listing, setShowDetail }: Props) => {
  const app = React.useContext(Trustlist)
  const user = React.useContext(User)
  const navigate = useNavigate()
  const [showMakeOffer, setShowMakeOffer] = React.useState<boolean>(false)

  React.useEffect(() => {
    const loadData = async () => {
      await app.loadOffers(listing._id)
    }
    loadData()
  }, [])
  const offers = app.offersByListingId.get(listing._id)
  const memberKeys = [user.epochKey(0), user.epochKey(1), user.epochKey(2)]

  

  return (
    <div className='dark-bg'>
      <div className='centered'>
        <div className='modal'>
          <div className='detail-content'>
            
            <div className='action-bar'>
              <div className='action-item'>
                {/* uncomment this to prevent user from making an offer on their own post */}
                {/* {user.hasSignedUp && !memberKeys.includes(listing.posterId) ? ( */}
                {user.hasSignedUp && !listing.dealOpened ? (
                  <>
                    <button onClick={()=> setShowMakeOffer(true)}>make an offer</button>
                      {showMakeOffer && <MakeOfferModal listingId={listing._id} listingTitle={listing.title} setShowMakeOffer={setShowMakeOffer}/>}
                  </>
                ) : (
                  <Tooltip
                    text='offer not allowed'
                    content={<button style={{cursor: 'not-allowed'}}>make an offer</button>}
                  /> 
                )}
              </div>
              <div className='action-item'>
                <div>⭐️</div>
                <div>favorite</div>
              </div>
              <div className='action-item'>
                <div>🚫</div>
                <div>hide</div>
              </div>
              <div className='action-item'>
                <div>🚩</div>
                <div>flag</div>
              </div>
              <div className='action-item'>
                <div>📤</div>
                <div>share</div>
              </div>
            </div>

            <div style={{display: 'flex'}}>
              <div className='detail-container'>
                <div className='detail-title'>{listing.title} - ${listing.amount} / {listing.amountType}</div>
                <div>{listing.description}</div>
              </div>
              <div className='trust-container'>
                <div className='trust-item'>
                  <Tooltip 
                    text={`Legitimate Poster score: this member has completed a transaction for ${app.calcScore(listing.pScore1)}% of the listings they have posted.`}
                    content=' LP score : '
                  />
                  <div style={{fontWeight: '600'}}>{app.calcScore(listing.pScore1)} %</div>
                </div>
                <div className='trust-item'>
                  <Tooltip 
                    text={`Community Builder score: this member has submitted attestations for ${app.calcScore(listing.pScore2)}% of the transactions they have been involved in`}
                    content=' CB score : '
                  />
                  <div style={{fontWeight: '600'}}>{app.calcScore(listing.pScore2)} %</div>
                </div>
                <div className='trust-item'>
                  <Tooltip 
                    text={`Trusted DealMaker: ${app.calcScore(listing.pScore3)}% of members who have transacted with this member would be happy to deal with them again`} 
                    content=' TD score : '
                  />
                  <div style={{fontWeight: '600'}}>{app.calcScore(listing.pScore3)} %</div>
                </div>
                <div className='trust-item'>
                  <Tooltip 
                    text={`Good Vibes score : others who have interacted with his member have given them ${app.calcScore(listing.pScore4) / 5}% of all possible points for being friendly, communicative, and respectful`} 
                    content=' GV score : '
                  />
                  <div style={{fontWeight: '600'}}>{app.calcScore(listing.pScore4) / 5} %</div>
                </div>
              </div>  
            </div>

            <div className='offers-container'>
              {listing.dealOpened ? 
                <>
                <div style={{display: 'flex'}}>
                  <div style={{textDecoration: 'line-through'}}>pending offers</div>
                  <div style={{color: 'blue', paddingLeft: '1rem'}}>offer accepted</div>
                </div>
                  <div className='offer-scroll'>
                  {offers ? 
                    offers.map((offer: Offer) => (
                    <div key={offer._id} className='offer'>
                      <div><span style={{color: 'blue'}}>${offer.offerAmount} </span>  ----    offering member's scores: </div>
                      <div className='offer-score'><span style={{fontWeight: '300'}}>LP: </span>{app.calcScore(listing.pScore1)} </div>
                      <div className='offer-score'><span style={{fontWeight: '300'}}>CB: </span>{app.calcScore(listing.pScore2)} </div>
                      <div className='offer-score'><span style={{fontWeight: '300'}}>TD: </span>{app.calcScore(listing.pScore1)} </div>
                      <div className='offer-score'><span style={{fontWeight: '300'}}>GV: </span>{app.calcScore(listing.pScore1) / 5} </div> 
                      {listing.responderId === offer.responderId ?
                        <button className='offer-accepted'>accepted</button>
                      : null }
                      <hr/>
                    </div>
                  )) : 'no offers yet' }
              
                </div>
                </>
              :
              <>
              <div style={{color: 'blue'}}>pending offers</div>
              <div className='offer-scroll'>
                  {offers ? 
                    offers.map((offer: Offer) => (
                    <div key={offer._id} className='offer'>
                      <div><span style={{color: 'blue'}}>${offer.offerAmount} </span>  ----    offering member's scores: </div>
                      <div className='offer-score'><span style={{fontWeight: '300'}}>LP: </span>{app.calcScore(offer.rScore1)} </div>
                      <div className='offer-score'><span style={{fontWeight: '300'}}>CB: </span>{app.calcScore(offer.rScore2)} </div>
                      <div className='offer-score'><span style={{fontWeight: '300'}}>TD: </span>{app.calcScore(offer.rScore3)} </div>
                      <div className='offer-score'><span style={{fontWeight: '300'}}>GV: </span>{app.calcScore(offer.rScore4) / 5} </div> 
                      {memberKeys.includes(listing.posterId) ? (
                        <button 
                          className='accept' 
                          onClick={async () => {
                            await app.dealOpen(listing._id, offer.offerAmount, offer.responderId)
                            navigate(`deal/${listing._id}`)
                          }}
                        >
                          accept deal
                        </button>
                      ) : null}
                      <hr/>
                    </div>
                  )) : 'no offers yet' }
              </div>
              </> 
              }
            </div>
            
            <button className='close-btn' onClick={() => setShowDetail(false)}>X</button>
          </div>
        </div>
      </div>
    </div>
  )
})