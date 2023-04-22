import { Express } from 'express'
import { DB } from 'anondb/node'
import { Synchronizer } from '@unirep/core'

export default (app: Express, db: DB, synchronizer: Synchronizer) => {
  app.post('/api/addListing', async (req, res) => {
    try {
      const { epoch, section, category, title, amount, amountType, description, posterId, pScore1, pScore2, pScore3, pScore4 } = req.body
      await db.create(`${section}`, {
        epoch,
        section,
        category,
        title,
        amount,
        amountType,
        description,
        posterId,
        pScore1,
        pScore2,
        pScore3,
        pScore4,
        responderId: '',
        offerAmount: '',
        rScore1: '',
        rScore2: '',
        rScore3: '',
        rScore4: '',
        dealOpened: false,
        dealClosed: false,
      })
      res.json({ message: 'success!' })
    } catch (error: any) {
      res.status(500).json({ error })
    }
  })
}