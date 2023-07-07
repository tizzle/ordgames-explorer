const ResponsiveSizes = () => {
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed z-50 px-2 py-1 text-sm font-medium text-white rounded-lg bottom-4 left-4 bg-secondary-500">
      <div className="block xs:hidden sm:hidden md:hidden lg:hidden xl:hidden">
        XXS
      </div>
      <div className="hidden xs:block sm:hidden md:hidden lg:hidden xl:hidden">
        XS
      </div>
      <div className="hidden xs:hidden sm:block md:hidden lg:hidden xl:hidden">
        SM
      </div>
      <div className="hidden xs:hidden sm:hidden md:block lg:hidden xl:hidden">
        MD
      </div>
      <div className="hidden xs:hidden sm:hidden md:hidden lg:block xl:hidden">
        LG
      </div>
      <div className="hidden xs:hidden sm:hidden md:hidden lg:hidden xl:block">
        XL
      </div>
    </div>
  );
};

export default ResponsiveSizes;
