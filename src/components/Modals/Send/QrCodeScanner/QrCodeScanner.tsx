import { Button, ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { SlideTransition } from 'components/SlideTransition'
import { Text } from 'components/Text'
import { lazy, Suspense } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslate } from 'react-polyglot'
import { useHistory } from 'react-router-dom'

import { SendRoutes } from '../Send'

const QrReader = lazy(() => import('react-qr-reader'))

export const QrCodeScanner = () => {
  const history = useHistory()
  const translate = useTranslate()
  const { setValue } = useFormContext()

  const handleError = () => {
    /** @todo render error to user */
    history.push(SendRoutes.Details)
  }

  const handleScan = (value: string | null) => {
    if (value) {
      setValue('address', value)
      history.push(SendRoutes.Address)
    }
  }

  return (
    <Suspense fallback={null}>
      <SlideTransition>
        <ModalHeader textAlign='center'>
          {translate('modals.send.qrScanner.scanQrCode')}
        </ModalHeader>
        <ModalCloseButton borderRadius='full' />
        <ModalBody>
          <QrReader
            delay={100}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%', overflow: 'hidden', borderRadius: '1rem' }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            isFullWidth
            variant='ghost'
            size='lg'
            mr={3}
            onClick={() => history.push(SendRoutes.Address)}
          >
            <Text translation='common.cancel' />
          </Button>
        </ModalFooter>
      </SlideTransition>
    </Suspense>
  )
}
