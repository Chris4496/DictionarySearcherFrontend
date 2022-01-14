import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
export default function NavBar(props) {
  const dictList = props.dictList;
  return (
    <Breadcrumb
      fontWeight="medium"
      fontSize="lg"
      borderRadius="xl"
      m="3"
      py="2"
      px="4"
      boxShadow="lg"
    >
      {[...dictList, { name: 'SynAnt' }].map(dict => (
        <BreadcrumbItem key={dict.name}>
          <BreadcrumbLink href={`#${dict.name}`}>
            {dict.name[0].toUpperCase() + dict.name.slice(1)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
