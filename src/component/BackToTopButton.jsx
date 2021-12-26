import { Box, IconButton } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

import { useState, useEffect } from 'react';

export default function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  return (
    showButton && (
      <Box
        position="fixed"
        bottom={['20px', '20px', '60px']}
        right={['20px', '20px', '60px']}
        zIndex={1}
      >
        <IconButton size="lg" onClick={handleScroll} icon={<ArrowUpIcon />} />
      </Box>
    )
  );
}
