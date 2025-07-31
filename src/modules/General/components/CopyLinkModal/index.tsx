import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import Modal from 'src/modules/General/components/Modal';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { CopyLinkModalProps } from './index.types';
import { useCopyLinkModal } from './useCopyLinkModal';

const CopyLinkModal: React.FC<CopyLinkModalProps> = ({
  open,
  handleClose,
  title,
  subtitle,
  copyText = 'Copy',
  link,
  onCopy,
}) => {
  const {
    data: { copied },
    operations: { handleCloseModal, onCopyClick },
  } = useCopyLinkModal(handleClose, onCopy);

  return (
    <Modal
      open={open}
      handleClose={handleCloseModal}
      icon={<FeaturedIcon type="modern" theme="gray" iconName="link-01" size="lg" />}
      title={title}
      subTitle={subtitle}
      mobileFullHeight={false}
      mobileCentered
      headerDivider={false}
      inlineTitle={false}
      contentClassName={css['content']}
    >
      <Input
        id="copy-url"
        value={link}
        postfix={
          <div className={copied ? css['copy--success'] : css['copy']} onClick={onCopyClick}>
            <Icon
              name={copied ? 'tick' : 'copy-01'}
              fontSize={20}
              color={copied ? variables.color_success_700 : variables.color_grey_700}
            />
            {copyText}
          </div>
        }
      />
    </Modal>
  );
};

export default CopyLinkModal;
